import React from 'react'
import countryList from './country-list'
import Error from './Error'
import classes from './checkout.module.scss'

const Billing = ({ input, handleOnChange }) => {
  return (
    <React.Fragment>
      {/*Name*/}

      <div className={classes.formGroup}>
        <label htmlFor="first-name">
          First Name
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.firstName}
          type="text"
          name="firstName"
          id="first-name"
        />
        <Error errors={input.errors} fieldName={'firstName'} />

        <label htmlFor="last-name">
          Last Name
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.lastName}
          type="text"
          name="lastName"
          id="last-name"
        />
        <Error errors={input.errors} fieldName={'lastName'} />
      </div>
      {/* Company Name */}
      <div className={classes.formGroup}>
        <label htmlFor="first-name">Company Name</label>
        <input
          onChange={handleOnChange}
          value={input.company}
          type="text"
          name="company"
          id="first-name"
        />
        <Error errors={input.errors} fieldName={'company'} />
      </div>
      {/* Country */}
      <div className={classes.formGroup}>
        <label htmlFor="country-select">
          Country
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <select
          onChange={handleOnChange}
          value={input.country}
          name="country"
          id="country-select"
        >
          <option value="">Select a country...</option>
          {countryList.length &&
            countryList.map((country, index) => (
              <option key={`${country}-${index}`} value={country.countryCode}>
                {country.countryName}
              </option>
            ))}
        </select>
        <Error errors={input.errors} fieldName={'country'} />
      </div>
      {/* Street Address */}
      <div className={classes.formGroup}>
        <label htmlFor="street-address">
          Street Address
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address1}
          name="address1"
          placeholder="House number and street name"
          id="street-address"
        />
        <Error errors={input.errors} fieldName={'address1'} />
        <br />
        <label htmlFor="address2"></label>
        <input
          type="text"
          onChange={handleOnChange}
          value={input.address2}
          name="address2"
          placeholder="Apartment, suite, unit etc.(optional)"
          id="first-name"
        />
      </div>
      {/* Town/City */}
      <div className={classes.formGroup}>
        <label htmlFor="city">
          Town/City
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.city}
          type="text"
          name="city"
          id="city"
        />
        <Error errors={input.errors} fieldName={'city'} />
      </div>
      {/* County */}
      <div className={classes.formGroup}>
        <label htmlFor="state">
          State/County
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.state}
          type="text"
          name="state"
          id="state"
        />
        <Error errors={input.errors} fieldName={'state'} />
      </div>
      {/* Post Code */}
      <div className={classes.formGroup}>
        <label htmlFor="post-code">
          Postcode
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.postcode}
          type="text"
          name="postcode"
          id="post-code"
        />
        <Error errors={input.errors} fieldName={'postcode'} />
      </div>
      {/*Phone & Email*/}

      <div className={classes.formGroup}>
        <label htmlFor="phone">
          Phone
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.phone}
          type="text"
          name="phone"
          className="form-control woo-next-checkout-input"
          id="phone"
        />
        <Error errors={input.errors} fieldName={'phone'} />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="email">
          Email
          <abbr className="required" title="required">
            *
          </abbr>
        </label>
        <input
          onChange={handleOnChange}
          value={input.email}
          type="email"
          name="email"
          id="email"
        />
        <Error errors={input.errors} fieldName={'email'} />
      </div>

      {/*	@TODO Create an Account */}
      {/*<div className="form-check">*/}
      {/*	<label className="form-check-label">*/}
      {/*		<input onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>*/}
      {/*			Create an account?*/}
      {/*	</label>*/}
      {/*</div>*/}
      {/*<h2 className="mt-4 mb-4">Additional Information</h2>*/}
      {/* @TODO Order Notes */}
      {/*<div className="form-group">*/}
      {/*	<label htmlFor="order-notes">Order Notes</label>*/}
      {/*	<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control woo-next-checkout-textarea" id="order-notes" rows="4"/>*/}
      {/*	<Error errors={ input.errors } fieldName={ 'orderNotes' }/>*/}
      {/*</div>*/}
    </React.Fragment>
  )
}

export default Billing
