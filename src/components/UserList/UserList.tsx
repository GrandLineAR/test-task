import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from "reactstrap";
import { TResponse } from "../../App";
import { UserItem } from "../index";

interface UserListInterface {
  data: TResponse,
}

const UserList = ({ data }: UserListInterface) => {

  return (
    <ListGroup>
      {data.items.map((item) => {
        return (
          <UserItem
            key={item.id}
            photo={item.owner.avatar_url}
            name={item.owner.login}
            repo={item.name}
            url={item.html_url}
            description={item.description}
          />
        )
      })}
    </ListGroup>
  )
}
export default UserList;
