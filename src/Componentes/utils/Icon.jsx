import React from 'react'
import * as fontAwesomeSolid from '@fortawesome/free-solid-svg-icons';
import * as fontAwesomeRegular from '@fortawesome/free-regular-svg-icons';
import * as fontAwesomeBrands from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({css, type, icon}) {

  switch (type) {
    case "solid":
      return(<FontAwesomeIcon className={`icon ${css}`} icon={fontAwesomeSolid[icon]} />)
      break;
    case "regular":
      return(<FontAwesomeIcon className={`icon ${css}`} icon={fontAwesomeRegular[icon]} />)
      break;
    case "brands":
      return(<FontAwesomeIcon className={`icon ${css}`} icon={fontAwesomeBrands[icon]} />)
      break;
    default:
      return(<FontAwesomeIcon className={`icon ${css}`} icon={fontAwesomeSolid[icon]} />)
      break;
  }

}