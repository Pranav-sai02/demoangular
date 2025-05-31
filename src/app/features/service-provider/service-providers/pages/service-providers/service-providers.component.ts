import { Component } from '@angular/core';
import { ServiceProviders } from '../../models/ServiceProviders';
import { ServicProvidersService } from '../../services/service-providers/servic-providers.service';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import { ActiveToggleRendererComponent } from '../../../../../shared/component/active-toggle-renderer/active-toggle-renderer.component';
import { SoftDeleteButtonRendererComponent } from '../../../../../shared/component/soft-delete-button-renderer/soft-delete-button-renderer.component';

@Component({
  selector: 'app-service-providers',
  standalone: false,
  templateUrl: './service-providers.component.html',
  styleUrl: './service-providers.component.css',
})
export class ServiceProvidersComponent {
 ActiveToggleRendererComponent = ActiveToggleRendererComponent;
  SoftDeleteRendererComponent = SoftDeleteButtonRendererComponent;
  toggleOptions = false;
 
  serviceProviders: ServiceProviders[] = [];
  gridApi!: GridApi;
 
   selectedUser: ServiceProviders | null = null; // row reference
  editedUser: ServiceProviders = {} as ServiceProviders; // detached copy for editing
 
  columnDefs: ColDef<ServiceProviders>[] = [
    {
      field: 'name',
      headerName: 'Name',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'address',
      headerName: 'Address',
      wrapText: true,
      autoHeight: true,
      cellClass: 'wrap-text',
      width: 250,
      cellStyle: {
        lineHeight: '1.4',
        borderRight: '1px solid #ccc',
        padding: '8px',
      },
      headerClass: 'bold-header',
    },
    {
      field: 'manager',
      headerName: 'Manager',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'townCity',
      headerName: 'Town / City',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'province',
      headerName: 'Province',
      cellStyle: { borderRight: '1px solid #ccc' },
      headerClass: 'bold-header',
    },
    {
      field: 'accredited',
      headerName: 'Accredited',
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
      cellRenderer: 'activeToggleRenderer',
      flex: 1,
      minWidth: 120,
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
      minWidth: 120,
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
      flex: 1,
      minWidth: 120,
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
 
  constructor(private providerService: ServicProvidersService) {}
 
  ngOnInit(): void {
    this.loadProviders();
  }
 
  loadProviders(): void {
    this.providerService.getServiceProviders().subscribe((data) => {
      this.serviceProviders = data;
 
      // Auto-size all except 'address'
      setTimeout(() => {
        if (this.gridApi) {
          const allColumnIds: string[] = [];
          this.gridApi.getColumns()?.forEach((col) => {
            const colId = col.getColId();
            if (colId && colId !== 'address') {
              allColumnIds.push(colId);
            }
          });
          this.gridApi.autoSizeColumns(allColumnIds);
        }
      }, 100);
    });
  }
 
  openPopup(user: ServiceProviders): void {
    this.selectedUser = user;
    this.editedUser = { ...user }; // shallow copy fine for flat object
    this.toggleOptions = false;
  }
 
  softDeleteProvider(provider: ServiceProviders): void {
    provider.isDeleted = true;
    const index = this.serviceProviders.findIndex((p) => p.id === provider.id);
    if (index !== -1) {
      this.serviceProviders.splice(index, 1);
    }
  }
 
  onGridReady(params: any): void {
    this.gridApi = params.api;
 
    setTimeout(() => {
      const allColumnIds: string[] = [];
      this.gridApi.getColumns()?.forEach((col) => {
        const colId = col.getColId();
        // Exclude 'address' column from auto-sizing
        if (colId && colId !== 'address') {
          allColumnIds.push(colId);
        }
      });
      this.gridApi.autoSizeColumns(allColumnIds);
    }, 100);
  }
 
 
 
  resetColumns(): void {
    this.gridApi.setGridOption('columnDefs', this.columnDefs); // Reset columns
  //  this.gridApi.resetColumnState(); // Reset column state (order, width, etc.)
  //  this.gridApi.sizeColumnsToFit(); // Optional: Resize columns to fit
  }
}