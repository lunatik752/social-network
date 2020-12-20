import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-incubator"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-incubator");
    })

    test("after creating <span> should be displayed ", () => {
        const component = create(<ProfileStatus status="it-incubator"/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test("after creating <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="it-incubator"/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe("it-incubator");
    });

    test("<input> should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it-incubator"/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe("it-incubator");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="it-incubator" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});



