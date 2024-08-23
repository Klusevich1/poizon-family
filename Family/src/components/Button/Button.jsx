import React from 'react'
import styles from './Button.module.css'

export const Button = ({category}) => {
  let link = category === 'sneakers' ? 'https://poizonfamily.ru/products?category=sneakers&page=1' : 'https://poizonfamily.ru/products?category=clothes&page=1'
  return (
    <div>
        <a href={link}><button className={styles.btn}>ПЕРЕЙТИ В КАТАЛОГ</button></a>
    </div>
  )
}
