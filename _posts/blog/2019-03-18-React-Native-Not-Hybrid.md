---
layout: blog_post
title: React Native - Native or Hybrid?
category: blog
---

React Native is dominating the mobile app development landscape.  
<small>I tried to come up with a justification of why based on my experience.</small>

#### What’s React Native?
- Native Application, not Hybrid
- JSX and ES6+ JavaScript interface
- Logic - JavaScript thread
- UI - Main thread (and more for background computing)
- Cross Platform

#### How does it work
- Writing code in JSX blocks
- Invoke platform API to display native
elements e.g. <View> becomes UIView for
iOS and View for Android
- React Native works like a connector between
platforms
- Business and View logic run by different
threads

#### Lifecycle of new component
- constructor() -> good place to add state
unless you are using class properties
- componentWillMount() -> avoid using it at
all, if anything needs to be done with
component do that in DidMount
- render() -> React Element which will be
rendered and made into native UI afterwards
- componentDidMount() -> perfect place to
call all side effects

#### Lifecycle of updating component
- componentWillReceiveProps(nextProps) -> try to
limit yourself just to this.setState only here
- shouldComponentUpdate(nextProps, nextState) ->
can be used for optimization
- componentWillUpdate(nextProps, nextState) ->
component will get an update, you can do some
calculations here depending on current and next
props/states
- render() -> As in mounting component lifecycle
- componentDidUpdate(prevProps, prevState) ->
component got updated you can call some refs here
or similar after update

#### How it does compare with other solutions?
- More performant than Cordova with Ionic as it is Native vs Hybrid
- Can reuse same code on all platforms (unlike Xamarin.iOS and Xamarin.Android,
while Xamarin.Forms has same capability)
- Flutter is new and not stable yet enough but it is promising as well
- Most complete JavaScript solution as of now

### The good parts (the final WHY)
- Write once, use everywhere
- Straightforward and easy to start if had experience with React previously
- Can reuse same libraries as from Web for most of the things (redux, redux-saga
etc.)
- Satisfying performance
- Community getting bigger on daily basis with plenty of packages that are getting
available
- Plenty of platforms that are supported with some additional packages (Windows
10, Windows 10 Mobile, OSX, Web)

#### The bad parts
- Problems with updating packages and RN itself
- No support for Android 64-bit (that’s need to be added as of 2019 it will be
required)
- Layers are pretty fast, but bridges might be bottleneck so this need to be
considered when writing a native module
- Rare cases where platforms JS interpreter are different (e.g. lack of Proxy within
Android - requires polyfill)

React Native provides an interface (bridge) between the Native language and Javascript code. There are heated debates on whether React Native is a native or a hybrid solution.  
Personally, I consider React Native closer to native side, as Facebook officially claims.
> We designed React Native such that it is possible for you to write real native code and have access to the full power of the platform.  

You can side with or against me, but React Native still rocks, so does React.

