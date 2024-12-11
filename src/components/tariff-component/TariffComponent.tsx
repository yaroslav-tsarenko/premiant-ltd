import React, {FC} from 'react';
import styles from './TariffComponent.module.scss';
import {TariffComponentProps} from '@/types/tariffComponent';
import Link from 'next/link';
import classNames from 'classnames';

const TariffComponent: FC<TariffComponentProps> = ({headline, price, percent, fullWidth}) => {
    return (
        <div className={classNames(styles.wrapper, { [styles.fullWidth]: fullWidth })}>
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    {headline}
                </h2>
                <div className={styles.divingLine}></div>
                <div className={styles.info}>
                    <div className={styles.prices}>
                        <p>Инвестиции:</p>
                        <p>от {price}$</p>
                    </div>
                    <div className={styles.prices}>
                        <p>Процент:</p>
                        <p>{percent}% в день</p>
                    </div>
                </div>
            </div>

            <Link href="#" legacyBehavior>
                <a className={styles.btn}>Выбрать тариф</a>
            </Link>
        </div>
    );
};

export default TariffComponent;