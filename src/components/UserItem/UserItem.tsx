import React from 'react';
import { ListGroupItem, Media } from "reactstrap";
import styles from './UserItem.module.scss';

type UserItemInterface = {
  photo: string
  name: string
  repo: string
  url: string
  description: string
}

const UserItem = ({photo, name, repo, url, description}: UserItemInterface) => {
  return (
    <ListGroupItem className="d-flex flex-row align-items-center">
      <Media className={`rounded ${styles.photo}`} object src={photo} alt="Generic placeholder image" />
      <div className="px-4 d-flex flex-column flex-fill">
        <h2>{name}</h2>
        <span className="text-uppercase">{repo}</span>
        <a target="blank" href={url} className="link-primary">{url}</a>
        <span>{description}</span>
      </div>
    </ListGroupItem>
  )
}
export default UserItem;
