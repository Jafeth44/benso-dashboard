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

  // eslint-disable-next-line @typescript-eslint/no-empty-function -- required by DataSource, nothing to tear down
  public disconnect() {}

  public setData(data: GetEquiposDto[]) {
    this._dataStream.next(data);
  }
}