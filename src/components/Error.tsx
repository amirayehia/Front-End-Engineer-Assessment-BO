import React from 'react';
import * as i18n from 'i18next';
interface FormProps {
 
  t: i18n.TFunction;
}
function Error({t}: FormProps) {
  return (
    <div>
      <p className='w-3/4 md:w-1/2 m-auto bg-red-50 border border-red-200 rounded p3 text-gray-600 p-3 mt-16 text-sm md:text-lg'>{t('error')}</p>
    </div>
  )
}

export default Error