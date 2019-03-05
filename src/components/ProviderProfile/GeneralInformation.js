
<table cellPadding="0" cellSpacing="0" width="100%">
                <thead>

                  { (data.providerDetailTypeName == 'Professional' || data.providerDetailTypeName == 'Supplier Individual') ? (
                    <tr>
                    <th>Specialty</th>
                    <th>Board</th>
                    <th>Board Status</th>
                    <th>Board Date</th>
                    <th>Board Expiration Date</th>
                    <th>Board Specialty</th>
                    <th>Board Subspecialty</th>
                  </tr>
                  )
                    : (
                    <tr>
                      <th>Specialty</th>
                    </tr>
                    ) }
                </thead>
                <tbody>
                  { data
                    ?



                    ((data.activeSpecialty) ?


                    data.activeSpecialty.map((item, index) => (
                        ( (item.providerSpecialtyText) ?



                        (
                            (data.providerDetailTypeName == 'Professional' || data.providerDetailTypeName == 'Supplier Individual') ?
                              (
                                <tr key={index}>
                                  <td>{Helper.checkIfNotAvailable(item.providerSpecialtyText)}</td>
                                  <td>{Helper.checkIfNotAvailable(item.boardCertificationOrganizationName)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.boardCertificationStatusName)} </td>
                                  <td>{DateUtil.convertDateToMMDDYYYY(item.boardCertificationDate)} </td>
                                  <td>{DateUtil.convertDateToMMDDYYYYBlank(item.boardCertificationExpirationDate)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.providerGeneralSpecialtyName)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.providerSubspecialtyName)} </td>
                                </tr>
                              ) :
                              (
                                <tr key={index}>
                                  <td>{item.providerSpecialtyText}</td>
                                </tr>
                              )
                          )



                          : '')
                      ))




                      : (
                      <tr>
  <td colSpan="7" className={pcGrid.alert}>

                        <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                        <div className={pcNotificationBar.container}>
                          <FA name="exclamation-triangle" />
{' '}
<span>No Record Found</span>
                        </div>
                      </div>
                      </td>
</tr>
                    )
                    )





                   : ''}

                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    );
  }
}

export default GeneralInformation;
