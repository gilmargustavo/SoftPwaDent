
import { browser, by, element } from 'protractor';
import { AdminView } from '../admin.po';
import { DoctorListPageObject } from './doctor-list.po';
import { E2eHelper } from '../controllers/e2eHelper';

describe('Some Item List', () => {
  describe('As a user, I', () => {
    let helper = new E2eHelper();
    let adminView = new AdminView();
    let listPO = new DoctorListPageObject();

    beforeEach(() => {
      adminView.goToAdminView();
      adminView.goToSomeItemView();
      adminView.toggleSideBar('close');
    });

    it('can control paging', () => {
      let defaultNumberOfRecordsPerPage = 5;

      listPO.goToNextPage();
      listPO.goToPreviousPage();
      listPO.goToPageNumber(2);
      listPO.goToLastPage();
      listPO.goToFirstPage();

    });

    it('can sort records', () => {
      let columnLabel = "Id";
      listPO.getColumnIndex(columnLabel).then((columnIndex) => {
        let arrBeforeSorting = [];
        let arrAfterSorting = [];

        listPO.sortColumn(columnIndex);

        // Get values of first and last records of a field before doing sorting records again
        listPO.getFirstAndLastRecordValues(columnIndex).then((arr) => {
          arrBeforeSorting = arr;
        });

        // Sort records again
        listPO.sortColumn(columnIndex);

        // Get values of first and last records of that same field again
        listPO.getFirstAndLastRecordValues(columnIndex).then((arr) => {
          arrAfterSorting = arr;

          // Swap 2 items in the array (reverse the order of the array items)
          listPO.swapArrayItems(arrBeforeSorting, 0, 1);
          expect(arrBeforeSorting).toEqual(arrAfterSorting);
        });
      });
    });
  });
});
