import React from 'react';
import * as i18n from 'i18next';
interface FormProps {
    getDataHandler: (a: string) => void;
    t: i18n.TFunction;
}
function SearchShipmemt({ getDataHandler,t }: FormProps) {
    
    function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
        if (!("value" in element)) {
            throw new Error(`Element is not a form field element`);
        }
    }
    const onsubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const firstField = event.currentTarget[0];
        assertIsFormFieldElement(firstField);
        getDataHandler(firstField.value)
    }
    return (
        <div className='search'>
            <p  >{t('search.main')}</p>
            <form  onSubmit={onsubmitHandler}>
                <input type="text" placeholder={t('search.placeholder')} />

                <button type='submit' ><i className="fa-solid fa-magnifying-glass "></i></button>

            </form>
        </div>
    )
}

export default SearchShipmemt