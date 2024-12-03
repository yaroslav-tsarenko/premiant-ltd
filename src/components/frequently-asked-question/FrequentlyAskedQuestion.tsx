"use client";

import React, {FC, useState} from 'react';
import { BsPlusLg } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import styles from "./FrequentlyAskedQuestion.module.scss";
import {FrequentlyAskedQuestionProps} from "@/types/frequentlyAskedQuestion";
import Image from 'next/image';

const FrequentlyAskedQuestion: FC<FrequentlyAskedQuestionProps> = ({item, questions = []}) => {
    const [openAnswers, setOpenAnswers] = useState<number[]>([]);

    const toggleAnswer = (index: number) => {
        setOpenAnswers(prevState =>
            prevState.includes(index)
                ? prevState.filter(i => i !== index)
                : [...prevState, index]
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <h1 className={styles.headline}>
                    ВОПРОСЫ И ОТВЕТЫ
                </h1>
            </div>

            <div className={styles.content}>
                <Image src={item} alt="Frequently Asked Question Item" className={styles.item}/>

                <section className={styles.faq}>
                    {questions.map(({question, answer}, index) => (
                        <div key={index} className={styles.question}>
                            <div className={styles.questionHeader}>
                                <h3 className={styles.questionText}>{question}</h3>
                                <button
                                    className={styles.questionButton}
                                    onClick={() => toggleAnswer(index)}
                                >
                                    <BsPlusLg
                                        className={`${styles.icon} ${
                                            openAnswers.includes(index) ? styles.iconActive : ''
                                        }`}
                                    />
                                </button>
                            </div>
                            <div
                                className={`${styles.answer} ${
                                    openAnswers.includes(index) ? styles.answerVisible : ''
                                }`}
                            >
                                <p className={styles.answerText}>{answer}</p>
                            </div>
                        </div>
                    ))}
                </section>


            </div>
        </div>
    );
};

export default FrequentlyAskedQuestion;
