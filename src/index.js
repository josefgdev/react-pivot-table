import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import loanLocalData from './loans.json';

let dataSourceSettings = {
  enableSorting: true,
  columns: [],
  valueSortSettings: { headerDelimiter: ' - ' },
  values: [
    { name: 'Active', caption: '# of Loans' },
    { name: 'TotalAmountFunded', caption: 'Principle amount' },
    {
      name: 'OutstandingPrincipalAsOfToday',
      caption: 'Outstanding balance',
      type: 'decimal',
    },
    { name: 'upb', caption: '% UPB', type: 'CalculatedField' },
    {
      name: 'CurrentAPRKey',
      caption: 'Total CurrentAPRKey',
      type: 'CalculatedField',
    },
  ],
  dataSource: getPivotData(),
  rows: [{ name: 'FacilityStructure' }, { name: 'CurrentRateType' }],
  formatSettings: [
    { name: 'OutstandingPrincipalAsOfToday', format: 'C0' },
    { name: 'upb', format: 'C1' },
    { name: 'CurrentAPRKey', format: 'C2' },
  ],
  expandAll: false,
  filters: [],
  calculatedFieldSettings: [
    {
      name: 'upb',
      formula:
        '"Sum(TotalAmountFunded)"/"Sum(OutstandingPrincipalAsOfToday)"*"100"',
    },
    {
      name: 'CurrentAPRKey',
      formula: '"Sum(CurrentAPRKey)"/"Sum(Active)"',
    },
  ],
};
function getPivotData() {
  let pivotData = loanLocalData?.Loans?.Loan;
  pivotData = pivotData.filter((item) => item.Active);
  return pivotData;
}
export const App = () => {
  return (
    <div className="control-pane">
      <div className="control-section" style={{ overflow: 'auto' }}>
        <PivotViewComponent
          id="PivotView"
          dataSourceSettings={dataSourceSettings}
          width={'100%'}
          allowCalculatedField={true}
          showFieldList={true}
          height={'290'}
          gridSettings={{ columnWidth: 140 }}
        ></PivotViewComponent>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);
