import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.module.scss';
import useAxios from "axios-hooks";
import { UserList } from "./components";
import ReactPaginate from 'react-paginate';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const PER_PAGE = 10;
const MAX_USERS = 1000;

const MAX_PAGES = MAX_USERS / PER_PAGE;

export type TResponse = {
  incomplete_results: boolean
  items: Array<{
    id: number
    name: string
    owner: {
      login: string
      avatar_url: string
    }
    description: string
    html_url: string,
  }>
  total_count: number
}

function App() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [{ data, loading, error }, refetch] = useAxios<TResponse, unknown>({
    baseURL: 'https://api.github.com/search/repositories',
    params: {
      q: `${search}stars:>=0`,
      page,
      per_page: PER_PAGE
    }
  });

  if (error) return (
    <div className="alert alert-danger" role="alert">
      <span>ERROR</span>
      <Button className="mx-3" onClick={() => refetch()}>Refetch</Button>
    </div>
  )

  return (
    <div className="vh-100 d-flex flex-column overflow-hidden">
      {
        loading || !data
        ? (
            <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
              <div className="spinner-border " role="status"/>
            </div>
          )
          : (
            <div className="flex-fill overflow-auto">
              <UserList {...{ data }}/>
            </div>
          )
      }
      <input
        type="text" className="form-control"
        placeholder="Search username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={(e) => setSearch(e.target.value)}
      />

        <div className="px-4 py-2 border-top">
          <ReactPaginate
            forcePage={page - 1}
            activeClassName={styles.active}
            breakLabel="..."
            containerClassName={styles.paginate}
            marginPagesDisplayed={2}
            nextLabel={<span>&rarr;</span>}
            pageCount={MAX_PAGES}
            pageRangeDisplayed={4}
            previousLabel={<span>&rarr;</span>}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        </div>
    </div>
);
}

export default App;
