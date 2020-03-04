import * as actionTypes from "./actionTypes";
export const getBlockList = json => {
  console.log("values");
  return {
    type: actionTypes.GETBLOCKLIST,
    json: json
  };
};
export const getBlockListData = () => {
  return dispatch => {
    fetch("http://54.190.196.94:5000/blocklist")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(getBlockList(json));
      });
  };
};
export const deleteBlockList = name => {
  return dispatch => {
    const opts = [{ NAME: name }];
    console.log(opts);
    fetch("http://54.190.196.94:5000/blocklist/delete/group", {
      method: "post",
      body: JSON.stringify(opts)
    })
      .then(function(response) {
        console.log(response.json());
      })
      .then(function(data) {
        console.log(data);
        dispatch(postdeleteBlockList(name));
      });
  };
};

const postdeleteBlockList = name => {
  console.log(name);
  return {
    type: actionTypes.DELETEBLOCKLIST,
    name: name
  };
};
export const deleteCategory = (name, category, value) => {
  return dispatch => {
    const opts = [{ NAME: name, CATEGORY: category, VALUE: value }];
    console.log(opts);
    fetch("http://54.190.196.94:5000/blocklist/delete", {
      method: "post",
      body: JSON.stringify(opts)
    })
      .then(function(response) {
        console.log(response.json());
      })
      .then(function(data) {
        console.log(data);
        dispatch(postdeleteCategory(name, category, value));
      });
  };
};

const postdeleteCategory = (name, category, value) => {
  return {
    type: actionTypes.DELETECATEGORY,
    name: name,
    category: category,
    value: value
  };
};
export const postCategory = (name, categoryvalues) => {
  return dispatch => {
    console.log("working");
    console.log(categoryvalues.length);
    let opts = []
    for (let i = 0; i < categoryvalues.length; i++) {
        console.log(categoryvalues[i][0]);
       opts.push(
        {
            NAME: name,
            CATEGORY: categoryvalues[i][0],
            ITEMS: "GENIUS",
            LIST_TYPE: "string",
            AUTHOR: "Nisarg@gmail.com",
            VALUE: categoryvalues[i][1]
          }
       )
        }
      fetch("http://54.190.196.94:5000/blocklist/insert", {
        method: "post",
        body: JSON.stringify(opts)
      })
        .then(function(response) {
          console.log(response.json());
          dispatch(postAfterCategory())
        })
        .then(function(data) {
          console.log(data);
        });
    };
  }
 const postAfterCategory = () =>{
  console.log("postAfterCategory");
  return {
    type: actionTypes.POSTAFTERCATEGORY,
  };
 }