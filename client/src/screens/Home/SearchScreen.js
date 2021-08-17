import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Container } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { Book } from 'src/components/book';
import { searchBooks } from 'src/actions/bookActions';
import { useQuery } from 'src/hooks/useQuery';
import { Filter } from 'src/components/core';

const SearchScreen = () => {
    const query = useQuery();

    const keyword = query.get('keyword') || '';
    const genres = query.get('genres') || '';
    const rate = query.get('rate') || 0;
    const priceTop = query.get('top') || 100;
    const priceBottom = query.get('bottom') || 0;

    const dispatch = useDispatch();
    const bookSearch = useSelector(state => state.bookSearch)
    const { loading, error, books, count } = bookSearch;

    useEffect(() => {
        dispatch(searchBooks(keyword, genres, rate, priceTop, priceBottom));
    }, [dispatch, keyword, genres, rate, priceTop, priceBottom]);

    return (
        <Container>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/search" active>
                    Search
                </Breadcrumb.Item>
            </Breadcrumb>

            <Route render={({history}) => <Filter history={history} />} />
            <h6 className="align-right text-right">Showing {count} books</h6>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {books.map((book) => (
                            <Col key={book._id} sm={12} md={6} lg={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
}

export default SearchScreen;