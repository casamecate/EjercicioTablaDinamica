import { Component } from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})

export class TableComponent {

    tabledata = [
        { id: 1, name: "Billy Bob", age: 12, gender: "male", height: 95, col: "red", dob: "14/05/2010", sub: 1 },
        { id: 2, name: "Jenny Jane", age: 42, gender: "female", height: 142, col: "blue", dob: "30/07/1954", sub: 1 },
        { id: 3, name: "Steve McAlistaire", age: 35, gender: "male", height: 176, col: "green", dob: "04/11/1982", sub: 1 },
    ];

    colors: any;
    columns: any;

    constructor() {
        this.colors = {
            "red": "red",
            "blue": "blue",
            "gray": "gray",
            "yellow": "yellow"
        }

        this.columns = [
            { title: "Name", field: "name", sorter: "string", width: 200, editor: "input", validator:"string" },
            {
                title: "Age", field: "age", sorter: "number", hozAlign: "right", editor: "input", validator:"numeric",
                mutateLink: ["age_height", "age10"],
                
            },
            { title: "Height", field: "height", sorter: "number", hozAlign: "center", editor: "input", width: 100, mutateLink: "age_height", validator:"numeric" },
            { title: "Number", field: "sub", hozAlign: "center", editor: "input", width: 100, mutateLink: "age_height", validator:"numeric" },
            {
                title: "Age*Height", field: "age_height", hozAlign: "center", sorter: "number", width: 100,
                mutator: this.getColumnD
            },
            {
                title: "Age10", field: "age10", hozAlign: "center", sorter: "number", width: 100,
                mutator: this.getColumnE
            },
            {
                title: "Favourite Color", field: "col", sorter: "string", editor: "list",
                editorParams: {
                    values: this.colors
                }
            },
            { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
        ];
    }

    ngOnInit(): void {
        this.drawTable();
    }

    private drawTable(): any {

        let table = new Tabulator("#example-table", {
            layout: "fitDataTable",
            columnDefaults: {
                width: 150, //set the width on all columns to 200px
            },
            columns: this.columns,
            data: this.tabledata,
            rowFormatter:function(row){
                row.getElement().style.backgroundColor = "#3451d3";
                row.getElement().style.color = "#ffffff";
            }
        });

        return table;
    }

    getColumnD = (value: any, data: any) => {
        return (data.age * data.height) - data.sub;
    }

    getColumnE = (value: any, data: any) => {
        return data.age * 10;
    }
}