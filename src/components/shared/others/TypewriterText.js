"use client";

import { useState, useEffect } from "react";

export default function TypewriterText({
  words = ["Propellant", "Catalyst", "Amplifier"],
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout;
    const typeSpeed = 100; // Speed for typing
    const deleteSpeed = 50; // Speed for deleting
    const pauseDuration = 2000; // How long to pause at the end of each word

    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        timeout = setTimeout(type, deleteSpeed);
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        timeout = setTimeout(type, typeSpeed);
      }

      if (!isDeleting && currentText === currentWord) {
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        timeout = setTimeout(type, typeSpeed);
      }
    };

    timeout = setTimeout(type, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="inline-block w-[2px] h-[1em] bg-current animate-pulse ml-1"></span>
    </span>
  );
}
