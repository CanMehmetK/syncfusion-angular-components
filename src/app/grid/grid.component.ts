import {Component, OnInit} from '@angular/core';
import {data} from './datasource';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    public data: object[];
    constructor() {
    }

    ngOnInit(): void {
        this.data = data;
    }

}
