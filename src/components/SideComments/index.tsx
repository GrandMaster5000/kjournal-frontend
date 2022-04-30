import React, { useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import { CommentItem } from './CommentItem'

import styles from './SideComments.module.scss';
import clsx from 'clsx';

const items = [
  {
    user: {
      fullname: 'Вася Пупкин',
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
  },
  {
    user: {
      fullname: 'Вася Пупкин',
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
  },
  {
    user: {
      fullname: 'Вася Пупкин',
    },
    text: 'Теперь, каждое рабочее утро, после кровати, я перекладываюсь туда спать ещё на часок. Ну и…',
    post: {
      title: 'Какая у вас дома ванна?',
    },
  },
];



export const SideComments = () => {
  const [visibleComments, setComments] = useState(false);

  const toggleVisibleComments = () => {
    setComments(prev => !prev);
  }

  return (
    <div className={clsx(styles.root, !visibleComments && styles.rotated)}>
      <h3 onClick={toggleVisibleComments}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visibleComments && items.map((obj, i) => (
        <CommentItem key={i} {...obj} />
      ))}
    </div>
  );
};
