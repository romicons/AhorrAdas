//                      FILTERS

const filteredOperations = [];

const filterByType = (type, operations) => {
    return operations.filter((operation) => operation.type === type)
};

const filterByCategory = (category, operations) => {
    return operations.filter((operation) => operation.category === category)
};

const filterOperationsFromDate = (date, operations) => {
    return operations.filter((operation) => operation.date >= date);
};

const filterOperationsUntilDate = (date, operations) => {
    return operations.filter((operation) => operation.date <= date);
};

const filterByOrder = (operations, order) => {
    const orderByAmount = (a, b) => {return a.amount - b.amount}
    const orderAlphabetycally = (a, b) => {
        if (a.description < b.description) {return -1;}
        if (a.description > b.description) {return 1;}
        return 0;
    };
    const orderByDate = (a,b) => {
        const dateA  = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
    }
    
    if (order === 'Más reciente') {
        return operations.sort((a, b) => orderByDate(b, a));
    }
    else if (order === 'Más antiguo') {
        return operations.sort(orderByDate);
    }
    else if (order === 'Menor monto') {
        return operations.sort(orderByAmount);
    }
    else if (order === 'Mayor monto') {
        return operations.sort((a, b) => orderByAmount(b, a));
    }
    else if (order === 'A/Z') {
        return operations.sort(orderAlphabetycally);
    }
    else if (order === 'Z/A') {
        return operations.sort((a, b) => orderAlphabetycally(b, a));
    }
};

