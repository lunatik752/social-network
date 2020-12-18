
export const updateObjectInArray = (items: any, itemId: any, objPropId: any, newObjPart: any) => {
    items.map((user: any) => {
        if (user[objPropId] === itemId) {
            return {...user, ...newObjPart};
        }
        return user;
    })
}

