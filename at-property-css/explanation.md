  # What is the @property css property

  The @property CSS at-rule is part of the CSS Houdini umbrella of APIs. It allows developers to explicitly define their
   CSS custom properties, allowing for property type checking and constraining, setting default values, and defining whether
   a custom property can inherit values or not.

   The @property rule represents a custom property registration directly in a stylesheet without having to run any JS.
   Valid @property rules result in a registered custom property, as if registerProperty() had been called with equivalent
   parameters.

  Syntax: 

  @property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}

  Descriptors

  Syntax: Describes the allowable syntax for the property. May be a <length>,
  <number>,
  <percentage>,
  <length-percentage>,
  <color>,
  <image>,
  <url>,
  <integer>,
  <angle>,
  <time>,
  <resolution>,
  <transform-function>,
  or <custom-ident>,
  or a list of data type and keyword values.

  The +(space-separated) and # (comma-separated) multipliers indicate that a list of values is expected,
  for example <color># means a comma-separated list of <color>values is the expected syntax.

  Example to this would be

  in the syntax of the property we pass "<color>#" that expects a comma-separated and list or <length>+" that expects
  a space-separated list of lengths

  then we would be able to call

    --my-colors: red, green, blue;
    --my-spacing: 10px 20px 30px;

  
  Vertical lines (|) can create "or" conditions for the expected syntax,
  for example <length>| auto accepts a <length>or auto,
  and <color># | <integer># expects a comma-separated list of <color>values or a comma-separated list of <integer>values.

  inherits: Controls whether the custom property registration specified by @property inherits by default. ;

  Sets the initial value for the property.

  so basically we say the name of the custom property we want and define 3 different things

  @property --box-color {
      syntax: "<color>";
      inherit: false;
      initial-value: orange;
    }

  now we can use in a class, just like we would with normal variables

  now it's working like before, on the box-1 where we defined the variable --box-color: lightblue, we are overriding the
  default value

  all we done here is creating a custom variable and gave to it a little bitt of parameters exact what that parameter
  is, and if i try to change the --box-color of box-1 class to 10px, when we inspect it with dev tools, we will see a warning
  next to the --box-color and it will default to the initial-value.

  This is already nice, because it gives us slightly more features than a normal custom property inside of CSS because
  now we can make sure that if we enter invalid value it will fallback to the initial value and ignore it

  ## Inheritance 

  Now another example, to test the child box that will inherit the custom property, we will use another one named --box-color-inherit
  the inherits will be true so any child elements of it should inherit the value from its parent, unless it's explicitly
  overriden.

  e.g.

  if we have now

    <div class="box-3 box-inherit">
      <div class="child box-inherit">
        Child
      </div>
    </div>

  these tags and now i don't pass a different color for the box-inherit, it will take the var(--box-inherit) default value
  but in this case, the box-3 has a color, and because the box child inherits from the parent, it will have the same
  background-color as the box-3

## Define in Javascript

We can also define it in javascript if we want, by saying the window.CSS.registerProperty({/*Same attributes from @property*/}),
by doing this, it will create a CSS custom property for us directly inside of js, so we can do both in CSS or JS.

## Downsides
  
We can see that the @property syntax doesn't have an actual syntax highlighting, there's no autocomplete, and it doesn't
really work super well inside of vs code, it even says that is an experimental property so even though it is not experimental
because it works in all browsers, this is something that needs to be fixed in vscode.


*/

## Defining Types

If we go on the mdn page and go into a property, such as the background-color, if we scroll down we'll see that there's an
initial value, in this case, transparent, it says that inherited is no, and the formal syntax which is background-color = <color>

So we can see that it is just as we defined on the custom properties we create

the display property is much more complex than the background-color, that says it accepts a <color>, the display in this case
accepts

display = 
[ <display-outside> || <display-inside>]  |
<display-listitem>                        |
<display-internal>                        |
<display-box>                             |
<display-legacy>                          |  
<display-putside || [ <display-inside> | math ]>

we see that it has a lots of different separators and it even has more definitions what each individual piece is going to
be, like

<display-outside> =
  block  |
  inline |
  run-in

if we end up looking in the mdn, and get a little confused about how this works, we can highlight these blue things, the
brackets, and it will give us a popup that will show us exactly what it is and if we click on it, it will give us the exact
definition of how it works.

So essentially the way that this works on a high level is that if we have something inside a brackets, it works just like
parentheses inside of an equation, saying that, for example, [ <display-outside> || <display-inside>], these two things
are grouped together inside of one and acts like one cohesive unit.

If we have an OR symbol, which is the pipe |, that is essentially saying that it is either going to be one case OR the other
 is going to be one of these different properties, and the || syntax, is saying that it is going be one or more of these
 in this particular order, so it's just going to be the <display-outside> or the both of them combined together into one
 particular thing.

 A great example of this is the css flex property.

 For example. we can set an elemennt with the flex of 1 or flex 1 0 0%, we can define both of those and they are essentially
 using the double pipe symbol to denote that it could be one, or it could be multiple, or it could be some type of combi
 nation

 The final type symbol is the && and it works just like an and symbol and the question mark means that this thing is
 optional, we can choose to add it or not

 We don't need to understand the in and outs of exactly how all this syntax work, and generally when we are defining a
 custom property it would be a more simple type, like the box-color we are using, which the syntax is just <color>.
 We could maybe do something like syntax: "<length> | <color>", for example, so it will be rather simple what we do it's
 just going to be one of the major CSS types.

 or we can also add the syntax as a particular property, such as syntax: "absolute | relative", so now we can use only
 these two types.