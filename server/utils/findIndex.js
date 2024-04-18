const isValidIndex = (data, id) => {
    const currentIndex = data.findIndex(el => el.id === id);
    if(currentIndex !== -1){
        data.splice(currentIndex, 1);
        return;
    }

    throw new Error('Invalid user id')
};

module.exports = isValidIndex;