import { DataSource } from "@angular/cdk/collections";
import { GetEquiposDto } from "../dtos/GetEquipos.dto";
import { Observable, ReplaySubject } from "rxjs";

export class EquiposDataSource extends DataSource<GetEquiposDto> {

  private _dataStream = new ReplaySubject<GetEquiposDto[]>();

  constructor(initialData: GetEquiposDto[]) {
    super();
    this.setData(initialData);
  }

  public connect(): Observable<GetEquiposDto[]> {
    return this._dataStream;
  }

  public disconnect() {}

  public setData(data: GetEquiposDto[]) {
    this._dataStream.next(data);
  }
}