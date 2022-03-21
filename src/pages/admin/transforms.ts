/* eslint-disable @typescript-eslint/no-unused-expressions */
// @ts-nocheck
const getJobsList = (jobs: any) => {
  return jobs.map((item: any) => {
    const customer = item.customer[0] || {};
    const duration = `${Math.floor(item.durationTime / 60)}h${
      item.durationTime % 60
    }m`;
    let cleaningTool = item.cleaningTool?.basic ? `Basic tool` : '';
    cleaningTool += item.cleaningTool?.vacuum ? ' + Vacuum' : '';
    return {
      customer,
      jobDetail: {
        preferDate:
          new Date(item.preferDate).toLocaleDateString() +
          ` ${item.startWorkingTime || ''}`,
        pricePerHour: item.pricePerHour,
        durationTime: duration,
        cleaningTool,
        note: item.customerNote,
        total: item.total,
        cleaningToolFee: item.cleaningToolFee,
      },
      bookingTime: new Date(item.updatedAt).toLocaleDateString(),
    };
  });
};


function transformPaymentMethods(allPaymentMethods: Array<{}>) {
  console.log({
      allPaymentMethods
  })
  const response = {
      listIds: [],
      paymentDetail: {}
  }
  if (!allPaymentMethods) {
    return response
  }
  allPaymentMethods.reduce((total: {
      listIds: Array<string>,
      paymentDetail: Object
  }, method) => {
      total.listIds.push(method._id),
      total.paymentDetail[method._id] = method
      return total
  }, response)
  return response
}

export { transformPaymentMethods }
export default getJobsList;
