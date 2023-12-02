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
      jobId: item._id,
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
      total.listIds.push(method._id)
      total.paymentDetail[method._id] = method
      return total
  }, response)
  return response
}

function convertCustomers(info: {
  customers: Array<Object>;
  hasMore: boolean;
}) {
  const result = {
    hasMore: false,
    offset: 0,
    listIds: [],
    customerDetail: {},
  };
  if (!info || !info.customers) {
    return result;
  }
  info.customers.reduce((allIds, customer) => {
    allIds.push(customer._id);
    result.customerDetail[customer._id] = customer;
    return allIds;
  }, result.listIds);
  result.hasMore = info.hasMore;
  result.offset = info.offset || 0;
  return result;
}

export { transformPaymentMethods, convertCustomers }
export default getJobsList;
