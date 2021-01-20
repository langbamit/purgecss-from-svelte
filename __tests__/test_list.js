const test_list = [];

test_list.push([
  "empty",
  ``,
  [
  ].sort()
]);

test_list.push([
  "HTML",
  `
<div class="test-container">Well</div>
<div class="test-footer" id="an-id"></div>
<a href="#" id="a-link" class="a-link"></a>
<input id="blo" type="text" disabled/>
`,
  [
    "div",
    "a",
    "input",
    "test-container",
    "test-footer",
    "a-link",
    "an-id",
    "blo"
  ].sort()
]);

test_list.push([
  "style tag and script tag",
  `
<script>
  let active = false;
</script>

<style>
  .test-container {
	  color: darkgray;
	  text-align: center;
  }

  .test-footer {
	  font-weight: bold;
  }
  
  .abc {

  } 
</style>

<div id="app">
  <div class="test-container">Well</div>
  <div class="test-footer" id="an-id"></div>
  <a href="#" id="a-link" class="a-link" class:active class:is_active="{active == true}"></a>
  <input id="blo" type="text" disabled/>
</div>
  `,
  [
    "div",
    "a",
    "input",
    "test-container",
    "test-footer",
    "a-link",
    "active",
    "is_active",
    "blo",
    "an-id",
    "app",
  ].sort()
]);

test_list.push([
  "svelte: prefix",
  `
<svelte:head />
<svelte:component />
<svelte:self />
<svelte:window />
<svelte:body />
<svelte:options />
  `,
  [
  ].sort()
]);

test_list.push([
  "class directive",
  `
<div class:active class:inactive={!active} class:isAdmin>...</div>
  `,
  [
    "div",
    "active",
    "inactive",
    "isAdmin"
  ].sort()
]);

test_list.push([
  "class expression must return all possible selectors",
  `
  <div class="item {active ? 'active' : 'inactive'}">...</div>
  `,
  [
    "div",
    "item",
    "active",
    ":",
    "inactive"
  ].sort()
]);

test_list.push([
  "Should ignore component's tag",
  `
<Component>
  <div>content</div>
</Component>
  `,
  [
    "div"
  ].sort()
]);

test_list.push([
  "Match all support chars in classes",
  `
  <div class="abc:def 100%" class:50% class:10%={true}>content</div>
  `,
  [
    "div",
    "abc:def",
    "100%",
    "10%",
    "50%",
  ].sort()
]);

test_list.push([
  "Match all support chars in classes",
  `
  <div class="abc:def 100%" class:50% class:10%={true}>content</div>
  `,
  [
    "div",
    "abc:def",
    "100%",
    "10%",
    "50%",
  ].sort()
]);

test_list.push([
  "Support specific comment",
  `
  <!-- class:foo,bar, baz -->
  `,
  [
    "foo",
    "bar",
    "baz",
  ].sort()
]);

test_list.push([
  "Ignore inside head tag",
  `
  <head>
    <meta charset="utf-8">
    <!-- class:foo,bar, baz -->
  </head>
  <div/>
  `,
  [
    "div",
  ].sort()
]);


export default test_list;