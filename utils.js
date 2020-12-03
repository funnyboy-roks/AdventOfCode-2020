module.exports = {
    array2djoin: (arr, joinInternal = '', joinAll = '\n') => {
        let out = [];
        arr.forEach((x) => {
            out.push(x.join(joinInternal));
        });
        return out.join(joinAll);
    }
}