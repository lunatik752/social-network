import profileReducer, {addPost, deletePost} from "./profileReduсer";
import React from "react";

let state = {
    posts: [
        {id: 1, message: 'Hello!!!', countLikes: 3},
        {id: 2, message: 'This is a post.', countLikes: 12}
    ]
};

test('length of array posts should be incremented', () => {
    // 1. test data (начальные данные для тестирования)
    let action = addPost('Hello world');
    // 2. action (действие производимое с тестируемыми данными)
    let newState = profileReducer(state, action);
    // 3. expectation (данные ожидаемые на выходе)
    expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
    // 1. test data (начальные данные для тестирования)
    let action = addPost('Hello world');
    // 2. action (действие производимое с тестируемыми данными)
    let newState = profileReducer(state, action);
    // 3. expectation (данные ожидаемые на выходе)
    expect(newState.posts[2].message).toBe('Hello world');
});

test('like counts of new post should be 0', () => {
    // 1. test data (начальные данные для тестирования)
    let action = addPost('Hello world');
    // 2. action (действие производимое с тестируемыми данными)
    let newState = profileReducer(state, action);
    // 3. expectation (данные ожидаемые на выходе)
    expect(newState.posts[2].countLikes).toBe(0);
});

test('after deleting length of array posts should be decrement ', () => {
    // 1. test data (начальные данные для тестирования)
    let action = deletePost(2);
    // 2. action (действие производимое с тестируемыми данными)
    let newState = profileReducer(state, action);
    // 3. expectation (данные ожидаемые на выходе)
    expect(newState.posts.length).toBe(1);
});

test('after deleting length sould not be  decrement if id is incorrect', () => {
    // 1. test data (начальные данные для тестирования)
    let action = deletePost(1000);
    // 2. action (действие производимое с тестируемыми данными)
    let newState = profileReducer(state, action);
    // 3. expectation (данные ожидаемые на выходе)
    expect(newState.posts.length).toBe(2);
});


