import { Model, PaginateModel } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { getGroupByOrOperator, getGroupValues } from "../util/general-utils";

import AppError from "@src/modules/error/AppError";
import escortC from "@src/modules/general/util/escort-controller";

type ModelType = Model<any> & PaginateModel<any>;

/**
 * should use queryFixer and setPaginateData before his
 */
export function createGetAllController(Model: ModelType) {
  return escortC(async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { paginateQuery, paginateOptions } = req;
    const { docs, ...result } = await Model.paginate(
      paginateQuery,
      paginateOptions
    );
    res.jsend.success({ [getModelName(Model)]: docs }, 200, {
      ...result,
    });
  });
}

export function createGetOneController(Model: ModelType) {
  return escortC(async function (req: Request, res: Response) {
    const { id } = req.params;

    const doc = await Model.findById(id);
    if (!doc) throwNotFound(Model, "id", id);

    res.jsend.success({ [Model.modelName]: doc }, 200, { id });
  });
}

export function createGetManyFromOneController(
  pathToSearch: string,
  ModelToFind: ModelType
) {
  return escortC(async function (req: Request, res: Response) {
    const { id } = req.params;
    const docs = await ModelToFind.find().where(pathToSearch).equals(id);
    if (!docs || docs.length === 0) throwNotFound(ModelToFind, "user", id);

    res.jsend.success({ [getModelName(ModelToFind, true)]: docs }, 200, { id });
  });
}

export function getDateSetter(date: Date) {
  return function (req: Request, res: Response, next: NextFunction) {
    req.body.day = date.getDay();
    req.body.month = date.getMonth();
    req.body.year = date.getFullYear();
    next();
  };
}

export function getGroupCounter(
  reqBodyPath: string | null,
  groupByPath: string,
  Model: ModelType
) {
  return escortC(async function (req: Request, res: Response) {
    const groupValues = getGroupValues(req, reqBodyPath);
    const aggObj = getGroupCounterAggObj(groupValues, groupByPath);
    const data = await Model.aggregate(aggObj);
    res.jsend.success({ [`${reqBodyPath}Data`]: data }, 200, {
      reqBodyPath,
      groupByPath,
      model: Model.modelName,
    });
  });
}

function throwNotFound(Model: ModelType, path: string, value: any) {
  throw new AppError(
    `no ${getModelName(Model)} found with ${path}: ${value}`,
    404
  );
}
function getModelName(Model: ModelType, many: boolean = true) {
  return `${Model.modelName.toLowerCase()}${many ? "s" : ""}`;
}

function getGroupCounterAggObj(
  groupValues: (number | string)[] | undefined,
  path: string
) {
  const matchStage = getGroupByOrOperator(groupValues, path);
  return [
    {
      $match: matchStage,
    },
    {
      $project: {
        _id: 1,
        [path]: 1,
      },
    },
    {
      $group: {
        _id: `$${path}`,
        count: {
          $sum: 1,
        },
      },
    },
  ];
}
