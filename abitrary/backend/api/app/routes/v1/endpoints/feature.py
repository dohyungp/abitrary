from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.routes import deps

router = APIRouter()


@router.get("/")
async def get_features(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    return crud.feature.get_list(db, skip=skip, limit=limit)


@router.get("/{id}")
async def get_feature(id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud.feature.get(db=db, id=id)


@router.post("/")
async def create_feature(
    feature_in: schemas.FeatureCreate, db: Session = Depends(deps.get_db)
):
    arm = crud.arm.get(db=db, id=feature_in.experiment_id)
    if not arm:
        raise HTTPException(status_code=404, detail="Arm not found")
    return crud.feature.create(db=db, obj_in=feature_in)


@router.put("/{id}")
def update_feature(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    feature_in: schemas.FeatureUpdate,
) -> Any:

    feature = crud.feature.get(db=db, id=id)
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    feature = crud.feature.update(db=db, db_obj=feature, obj_in=feature_in)
    return feature