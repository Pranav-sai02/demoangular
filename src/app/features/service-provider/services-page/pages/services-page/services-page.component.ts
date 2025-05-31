import { Component } from '@angular/core';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from 'ag-grid-community';
import { ServicesPage } from '../../models/Services-page';
import { ServicesPageService } from '../../services/service-page/services-page.service';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';

@Component({
  selector: 'app-services-page',
  standalone: false,
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css',
})
export class ServicesPageComponent {
  rows: ServicesPage[] = [];
  private gridApi!: GridApi;
  toggleOptions = false;

  ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;

  columnDefs: ColDef<ServicesPage>[] = [
    {
      field: 'description',
      headerName: 'Description',

      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'serviceType',
      headerName: 'Service Type',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'voucherProvider',
      headerName: 'Voucher Provider',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'requireCell',
      headerName: 'Require Cell',
      flex: 1,
      minWidth: 120,

      cellRenderer: (params: any) => {
        const imagePath = params.value
          ? 'assets/icons/tick.png'
          : 'assets/icons/cross.png';
        return `<img src="${imagePath}" alt="${
          params.value ? 'Yes' : 'No'
        }" style="width: 20px; height: 20px;" />`;
      },
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
    },
    {
      field: 'isActive',
      headerName: 'Active',
      flex: 1,
      minWidth: 120,

      cellRenderer: 'activeToggleRenderer',
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
      minWidth: 130,

      cellRenderer: (_: ICellRendererParams) =>
        '<i class="fas fa-eye" title="Can View / Edit" style="color: green;"></i>',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '17px',
      },
      onCellClicked: (params: any) => this.openPopup(params.data),
      headerClass: 'bold-header',
    },
    {
      headerName: 'Delete',
      field: 'isDeleted',

      cellRenderer: 'softDeleteRenderer',
      cellStyle: {
        borderRight: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerClass: 'bold-header',
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    
  };

  constructor(private spSvc: ServicesPageService) {}

  ngOnInit(): void {
    this.spSvc.getAll().subscribe((data) => {
      this.rows = data;

      // Auto-size dynamic columns after data load
      setTimeout(() => this.autoSizeColumnsBasedOnContent(), 0);
    });
  }

  onGridReady(e: GridReadyEvent) {
    this.gridApi = e.api;

    // You can optionally call this if you want fixed columns to fit grid width
    // this.onFitColumns();

    // Auto-size the dynamic columns after grid is ready
    this.autoSizeColumnsBasedOnContent();
  }

  onFitColumns() {
    if (!this.gridApi) return;

    // Get all ColDefs, exclude ColGroupDefs (which have no 'field')
    const allColDefs = this.gridApi.getColumnDefs() ?? [];

    // Filter only columns with a 'field' (exclude col groups)
    const allColumnFields = allColDefs
      .filter(
        (colDef): colDef is ColDef => (colDef as ColDef).field !== undefined
      )
      .map((colDef) => (colDef as ColDef).field!) // non-null assertion
      .filter((field) => field !== undefined);

    // Exclude the 3 columns for auto-size by content
    const columnsToFit = allColumnFields.filter(
      (field) =>
        ![
          'description',
          'serviceType',
          'voucherProvider',
          'requireCell',
          'isActive',
          'view',
          'isDeleted',
        ].includes(field)
    );

    if (columnsToFit.length) {
      // Use autoSizeColumns to auto size specific columns by content
      this.gridApi.autoSizeColumns(columnsToFit, false);
    }

    // Optionally, fit remaining columns to fill grid width
    // this.gridApi.sizeColumnsToFit();
  }

  autoSizeColumnsBasedOnContent() {
    if (!this.gridApi) return;

    const columnsToAutoSize = [
      'description',
      'serviceType',
      'voucherProvider',
      'requireCell',
      'isActive',
      'view',
      'isDeleted',
    ];
    this.gridApi.autoSizeColumns(columnsToAutoSize, false);
  }

  openPopup(user: ServicesPage): void {
    this.toggleOptions = false;
    // your popup logic here
  }
}
