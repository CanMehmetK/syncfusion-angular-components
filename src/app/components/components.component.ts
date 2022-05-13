import {Component, OnInit, ViewChild} from '@angular/core';
import {DropDownListComponent} from "@syncfusion/ej2-angular-dropdowns";

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  @ViewChild('games1') public listObj: DropDownListComponent;
  public sportsData: Object[] = [
    {Id: 'Game1', Game: 'American Football'},
    {Id: 'Game2', Game: 'Badminton'},
    {Id: 'Game3', Game: 'Basketball'},
    {Id: 'Game4', Game: 'Cricket'},
    {Id: 'Game5', Game: 'Football'},
    {Id: 'Game6', Game: 'Golf'},
    {Id: 'Game7', Game: 'Hockey'},
    {Id: 'Game8', Game: 'Rugby'},
    {Id: 'Game9', Game: 'Snooker'},
    {Id: 'Game10', Game: 'Tennis'}
  ];
  // maps the local data column to fields property
  public localFields: Object = {text: 'Game', value: 'Id'};
  // set the placeholder to ComboBox input element
  public localWaterMark: string = 'Select a game';

  public cssClass: string = 'e-outline';
  // set the height of the popup element
  public height: string = '220px';

  constructor() { }

  ngOnInit(): void {
  }

}
