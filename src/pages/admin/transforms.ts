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

export default getJobsList;
