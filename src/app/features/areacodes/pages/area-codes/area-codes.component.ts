import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ColDef,
  ICellRendererParams,
  GetContextMenuItemsParams,
  GetContextMenuItems,
} from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { AreaCodes } from '../../models/AreaCodes';
import {
  LoadAreaCodes,
  UpdateAreaCode,
  SoftDeleteAreaCode,
  AddAreaCode,
} from '../../state/area-codes.actions';
import { AreaCodesState } from '../../state/area-code.state';

@Component({
  selector: 'app-area-codes',
  standalone: false,
  templateUrl: './area-codes.component.html',
  styleUrls: ['./area-codes.component.css'],
})
export class AreaCodesComponent implements OnInit, OnDestroy {
  @Select(AreaCodesState.getAreaCodes) areaCodes$!: Observable<AreaCodes[]>;
  rowData: AreaCodes[] = [];

  columnDefs: ColDef[] = [
    // {
    //   field: 'AreaCodeId',
    //   headerName: 'ID',
    // },
    {
  field: 'AreaCode',
  headerName: 'Code',
  sortable: true,
  flex: 1,
  maxWidth: 150,
  editable: true,
  cellEditor: 'agTextCellEditor',
  valueFormatter: params => params.value ? params.value : 'Enter Areacode',
  cellClassRules: {
    'hint-text': params => !params.value,
  },
  cellStyle: { borderRight: '1px solid #ccc', textAlign: 'center' },
  headerClass: 'bold-header',
    },
    {
  field: 'Description',
  headerName: 'Description',
  sortable: true,
  flex: 2,
  minWidth: 200,
  editable: true,
  cellEditor: 'agTextCellEditor',
  valueFormatter: params => params.value ? params.value : 'Enter Country/Region',
  cellClassRules: {
    'hint-text': params => !params.value,
  },
  cellStyle: { borderRight: '1px solid #ccc' },
  headerClass: 'bold-header',
    },
    {
      field: 'Type',
      headerName: 'Type',
      sortable: true,
      flex: 1,
      minWidth: 180,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Landline', 'Mobile', 'International'],
      },
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'IsActive',
      headerName: 'Active',
      flex: 1,
      minWidth: 120,
      editable: true,
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
    },
    {
      field: 'view',
      headerName: 'View',
      flex: 1,
      minWidth: 100,
      cellRenderer: (_: ICellRendererParams) =>
        '<i class="fas fa-eye" title="Can View / Edit" style="color: green;"></i>',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '17px',
      },
      headerClass: 'bold-header',
    },
    {
      headerName: 'Delete',
      field: 'isDeleted',
      flex: 1,
      minWidth: 100,
      cellRenderer: () =>
        '<i class="fas fa-trash" style="color: red; cursor: pointer;"></i>',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
      onCellClicked: (params: any) => this.softDeleteProvider(params.data),
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadAreaCodes());
    this.store.select(AreaCodesState.getAreaCodes).subscribe((data) => {
      console.log('From select:', data);
      this.rowData = data;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onCellValueChanged(event: any): void {
    const updatedAreaCode: AreaCodes = event.data;
    this.store.dispatch(new UpdateAreaCode(updatedAreaCode));
  }

  softDeleteProvider(areaCode: AreaCodes): void {
    const updatedAreaCode = { ...areaCode, isDeleted: true };
    this.store.dispatch(new SoftDeleteAreaCode(updatedAreaCode));
  }
 
  


  addRow(): void {
    const newAreaCode: AreaCodes = {
      AreaCodeId: Math.floor(Math.random() * 100000),
      AreaCode: '',
      Description: '',
      Type: 'Landline',
      IsActive: true,
      view: '',
      isDeleted: false,
    };
    this.store.dispatch(new AddAreaCode(newAreaCode));
  }

  getContextMenuItems: GetContextMenuItems = (
    params: GetContextMenuItemsParams
  ) => {
    const addRow = {
      name: 'Add Row',
      action: () => this.addRow(),
      icon: '<i class="fas fa-plus"></i>',
    };

    const deleteRow = {
      name: 'Delete Row',
      action: () => {
        if (params.node) {
          this.softDeleteProvider(params.node.data);
        }
      },
      icon: '<i class="fas fa-trash"></i>',
    };

    return [addRow, deleteRow, 'separator', 'copy', 'export'];
  };
}
