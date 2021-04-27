exports.getSQLErrorMessage = err => {
  if (!err) throw new Error('Unknown error');
  switch (err.code) {
    case 'ER_DUP_ENTRY':
      return 'There is already a user with that username';
    case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
      return 'Invalid data for one or more fields';
    default:
      return '';
  }
};

exports.handleSQLError = err => {
  console.error(err.message);
  throw new Error(this.getSQLErrorMessage(err));
};
