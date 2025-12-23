Need to come up with a plan for the shape of a message and how that gets
used on a Controller.

Something like "scale: 0.5"

So a message could have as hape like
```js
{
    "action": "scale",
    "props": [ 0.5 ]
}
```

But what if I wanted to do something like a scalable shrink/grow function.

That would just need to be an action on the sceneItem.
We could define a curve as an exponential curve of y = a * b^c
We want to get a value that would increase

```js
{
    "action": "growLinear",
    "props": [ 2.99, 10 ]
}
```

This is a simple growing function that would multiply an input (say 2.99)
by a scalar value (e.g. 10) that would result in simple linear return values
that would be used to determine how much to grow in say pixels. so 2.99 would
grow us by 29.9 pixels - we would probably floor this to be safe so it would be
29 pixels. We could then clamp this with limits so that it would stay within a reasonable
min and max value.

So our websocket messages would basically be "action" that would be a function we would call
and props would be the values we would pass into it.

So for the Vue side of things we need to create some small forms that would contain fields
for props and a button to send the action. We'll need to identify these in some way that the
Vue form can become aware of them from the Controller.

So the Controller should say I can do "growLinear" and require 2 numbers for it. And Vue then creates
a form to fulfill that action.

So what shape would that take on the controller.

```js
[
    // something like the second value of growLinear could possibly be a configurable value so we only have
    // to submit a single number and the growth rate would be consistent
    {"action": "growLinear", props: ["number", "number"]},
    {"action": "scale", props: ["number"]}
]
```

So the controller will need to add a method to the Express app of something like
`/obs/:sceneId/action` that would then call an action with the provided arguments.
So it would need to do some kind of lookup on the Scene object for the method and then
execute the function a la `scene[action](...props)`. We could also have something like
`/obs/action` that would be an "execute on all scenes" type function.


# Todos
    -[ ] Save state into either a database or a state file of some sort.
    -[ ] Restore state on load
    -[ ] Load actions from Controller
    -[ ] Run actions from Vue



