import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable()
export class CustomServerDataSource extends LocalDataSource {

  lastRequestCount: number = 0;

  constructor(protected http: HttpClient, protected endpoint: string) {
    super();
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    let url = this.endpoint;

    let req = {}
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        req['sort'] = fieldConf.field;
        req['order'] = fieldConf.direction.toUpperCase();
      });
    }

    if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
        req['page'] = this.pagingConf['page'];
        req['limit'] = this.pagingConf['perPage'];
    }

    req['filters'] = [];
    if (this.filterConf.filters) {
      this.filterConf.filters.forEach((fieldConf) => {
        if (fieldConf['search']) {
            req['filters'].push({'name': fieldConf['field'], 'value': fieldConf['search']});
        }
      });
    }

    return this.http.post(url, req, { observe: 'response' })
      .pipe(
        map(res => {
          this.lastRequestCount = +res.body['total'];
          return res.body['data'];
        })
      ).toPromise();
  }

  update(element: any, values: any): Promise<any> {
    this.remove(element);
    return this.add(element);
  }

}
