'use strict';

const resolvers = {
    Query: {
        grades: (root, args, { db }, infos) => db.grade.query(),
        grade: (root, { id }, { db }, infos) => db.grade.query().findById(id),
    }
}

module.exports = resolvers;