import axios from 'axios';

import {
  LOGOUT_USER
} from './types';

exports.logOutUser = () => {
  // Delete cookie

  return { type: LOGOUT_USER };
}