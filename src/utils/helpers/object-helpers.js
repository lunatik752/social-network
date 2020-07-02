
export const updateObjectInArray = (items, itemId, objPropId, newObjPart) => {
    items.map(user => {
        if (user[objPropId] === itemId) {
            return {...user, ...newObjPart};
        }
        return user;
    })
}

