"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " : " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    var list = document.getElementById("messagesList");
    list.insertBefore(li, list.childNodes[0]);
    document.getElementById("messageInput").value = '';
    document.getElementById("messageInput").focus();
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("redBtn").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, "RED").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("blueBtn").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, "BLUE").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("greenBtn").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, "GREEN").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("yellowBtn").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, "YELLOW").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("addGroupBtn").addEventListener("click", function (event) {
    var user = document.getElementById("name").value;
    var group = document.getElementById("group").value;
    connection.invoke("AddGroup", group, user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
connection.on("RecAddGroupMsg", function (message) {
    var msg = message;
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("msgDiv").appendChild(li);
});
// 群組訊息Button事件
document.getElementById("submitGroupBtn").addEventListener("click", function (e) {
    var user = document.getElementById("name").value;
    var group = document.getElementById("group").value;
    var message = document.getElementById("msg").value;

    connection.invoke("SendMessageToGroup", group, user, message).catch(function (err) {
        return console.error(err.toString());
    });
});

// 群組訊息接收事件
connection.on("ReceiveGroupMessage", function (groupName, user, message) {
    var msg = `[群組訊息(${groupName})]${user}：${msg}`;
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("msgDiv").appendChild(li);
});

// 全頻道訊息訊息事件
connection.on("ReceiveMessage", function (user, message) {
    var msg = `[全頻道訊息(${groupName})]${user}：${msg}`;
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("msgDiv").appendChild(li);
});