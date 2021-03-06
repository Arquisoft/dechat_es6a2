/**
 * author: es6a2 group
 */
const assert = require("assert");
const Loader = require("../src/lib/Repositories/SolidLoaderRepository");
const OpenService = require("../src/lib/Services/OpenService");
const BaseService = require("../src/lib/Services/BaseService");
const CreateService = require("../src/lib/Services/CreateService");
const MessageService = require("../src/lib/Services/MessageService");
const JoinService = require("../src/lib/Services/JoinService");
const Encrypter = require("../src/lib/Services/EncryptionService");

const namespaces = require("../src/lib/namespaces");
const auth = require("solid-auth-client");
const openService = new OpenService(auth.fetch);
const baseService = new BaseService(auth.fetch);
const joinService = new JoinService(auth.fetch);
const messageService = new MessageService(auth.fetch);
const createService = new CreateService(auth.fetch);
const encrypter = new Encrypter();

const loader = new Loader(auth.fetch);

describe("Services", function() {
    this.timeout(15000);

    it("Initialization", async function() {
        encrypter.setPassword("jkkjdskj834843bub8frb");
        baseService.setEncrypter(encrypter);
        joinService.setEncrypter(encrypter);
        messageService.setEncrypter(encrypter);
        openService.setEncrypter(encrypter);
        createService.setEncrypter(encrypter);
        loader.setEncrypter(encrypter);
    });

    it("Base Service tests", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");

        var selfPhoto = await baseService.getPhoto(chat.userWebId);
        assert.equal(selfPhoto, null, "The user does not have a photo : " + chat.userWebId + " ->" + selfPhoto);

        selfPhoto = await baseService.getPhoto("https://helbrecht.solid.community/profile/card#me");
        assert.equal("https://helbrecht.solid.community/profile/Lord_High_Marshal_Helbrecht.jpg", selfPhoto, "The user photo is not ->" + selfPhoto);

        const name = await baseService.getFormattedName(chat.userWebId);
        assert.equal(name, "Othmane Bakhtaoui", "The user name is not correct : ->" + name);

        const group = await baseService.getFormattedName("URL/Group/VrilU+0020Society");
        assert.equal(group, "Vril Society", "The group name is not correct : ->" + group);

        const note = await baseService.getNote(chat.userWebId);
        assert.equal(note, null, "we do not have a note yet.");

        const userDataUrl = await baseService.getDefaultDataUrl(chat.userWebId);
        chat.url = await baseService.generateUniqueUrlForResource(userDataUrl);
        //everytime should be different
        assert.notEqual(chat.url, "https://othbak.solid.community/private/dechat_201903220911.ttl#yeb74cmsjtki2wzo", "chat unique url is not correct");

        //we do not have an invitation
        const invite = baseService.getInvitation(chat.fileurl);
        assert.equal(invite.sender, null, "the invitation url is not correct: ->" + invite.sender);

        //Delete a file
        await baseService.writePermission("https://othbak.solid.community/public/fileToDelete.ttl");
        await baseService.deleteFileForUser("https://othbak.solid.community/public/fileToDelete.ttl");

        assert.equal(await baseService.readPermission("https://takumi.solid.community/profile/card#me"), true, "");
        assert.equal(await baseService.readPermission("https://thoth.inrupt.net/profile/card#me"), true, "");
        assert.equal(await baseService.readPermission("https://thoth.inrupt.net/private"), false, "");
    });

    it("More Base Service tests", async function() {
        const note2 = await baseService.getNote("https://oth3.solid.community/profile/card#me");
        assert.equal(note2, "testing", "we do have a note ->" + note2);

        const defaultPic = await baseService.getDefaultFriendPhoto();
        assert.equal(defaultPic, "main/resources/static/img/friend_default.jpg", "Default picture is incorrect.");
    });

    it("Base Service tests -> updates and invitations", async function() {
        //this user does have an invitation
        const anotherInvitation = baseService.getInvitation("https://yarrick.solid.community/public/");
        assert.notEqual(anotherInvitation, null, "the invitation url is not correct: ->" + anotherInvitation);

        //check user inbox for updates
        var updates = await baseService.checkUserInboxForUpdates("https://yarrick.solid.community/public/");
        assert.notEqual(updates, null, "the user does have updates" + updates);

        const inv = baseService.getInvitation("https://oth1.solid.community/public/");
        assert.notEqual(inv, null, "the user does have an invitation ->" + inv);
    });

    it("Checking the picture and name are correct using loader", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");

        const selfPhoto = await baseService.getPhoto(chat.userWebId);
        assert.equal(selfPhoto, null, "The user does not have a photo : " + chat.userWebId + " ->" + selfPhoto);

        const name = await baseService.getFormattedName(chat.userWebId);
        assert.equal(name, "Othmane Bakhtaoui", "The user name is not correct : ->" + name);

        const note = await baseService.getNote(chat.userWebId);
        assert.equal(note, null, "we do not have a note yet.");
    });

    it("Checking the picture and name are correct using loader with a user with no name", async function() {
        const chat = await loader.loadChatFromUrl("https://decker.solid.community/public/dechat_201903110956.ttl#jt4tuya4", "https://decker.solid.community/profile/card#me", "https://decker.solid.community/public/dechat_201903110956.ttl");

        const selfPhoto = await baseService.getPhoto(chat.userWebId);
        assert.equal(selfPhoto, null, "The user does not have a photo : " + chat.userWebId + " ->" + selfPhoto);

        const name = await baseService.getFormattedName(chat.userWebId);
        assert.equal(name, "Decker", "The user name is not correct : ->" + name);
    });


    it("Simple chat tests using openService.js", async function() {
        const userDataUrl = await baseService.getDefaultDataUrl("https://othbak.solid.community/profile/card#me");
        const chat = await openService.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl", "https://morningstar.solid.community/profile/card#me");

        const selfPhoto = await baseService.getPhoto(chat.userWebId);
        assert.equal(selfPhoto, null, "The user does not have a photo : " + chat.userWebId + " ->" + selfPhoto);

        const name = await baseService.getFormattedName(chat.userWebId);
        assert.equal(name, "Othmane Bakhtaoui", "The user name is not correct : ->" + name);

        const note = await baseService.getNote(chat.userWebId);
        assert.equal(note, null, "we do not have a note yet.");
    });

    it("Checking the number of stored chats is none in chatstorage.ttl simulator", async function() {
        const chats = await openService.getChatsToOpen("https://yarrick.solid.community/public/dechat_201903120205.ttl");
        //the user at the moment has no messages
        assert.equal(chats.length, 0, "the number of chats stored is not correct : " + chats.length);
    });

    it("Checking the inboxUrl", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");

        const inboxUrls = [];
        inboxUrls[chat.userWebId] = (await baseService.getObjectFromPredicateForResource(chat.userWebId, namespaces.ldp + "inbox")).value;
        assert.equal(inboxUrls[chat.userWebId], "https://othbak.solid.community/inbox/", "the inbox url is not correct : " + inboxUrls[chat.userWebId]);

        expectedUrl = await baseService.getInboxUrl(chat.userWebId);
        assert.equal(inboxUrls[chat.userWebId], expectedUrl, "the inbox url is not correct : " + inboxUrls[chat.userWebId]);

        //Checking user updates
        try {
            const updates = await baseService.checkUserInboxForUpdates(inboxUrls[chat.userWebId]);
            assert.equal(updates, null, "there are no updates in this profile");
        } catch (err) {
            console.log(err);
        }

    });

    it("Checking that there are 9 messages in my pod", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");
        assert.equal(chat.getMessages().length, 9, "the number of messages is not correct : " + chat.getMessages().length);
        assert.equal(chat.getMessages()[0].messagetext, "unit", "the text message is not correct : " + chat.getMessages()[0].messagetext);
        assert.equal(chat.getMessages()[1].messagetext, "test", "the text message is not correct : " + chat.getMessages()[1].messagetext);
    });

    it("Checking writing permissions", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");
        const dataUrl = baseService.getDefaultDataUrl(chat.userWebId);
        assert.equal(await baseService.writePermission(dataUrl), false, "we do not have writing permission for the moment ");
    });

    it("Creating individual semantic chat", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");
        const dataUrl = baseService.getDefaultDataUrl(chat.userWebId);
        var semanticChat = await createService.setUpNewChat(dataUrl, chat.userWebId, "https://morningstar.solid.community/profile/card#me");
        const friendName = await baseService.getFormattedName("https://morningstar.solid.community/profile/card#me");

        //Simulating a new chat
        assert.equal(friendName, "Luci", "The user name is not correct : ->" + friendName);
        assert.equal(semanticChat.userWebId, "https://othbak.solid.community/profile/card#me", "The user web id is not correct : ->" + semanticChat.userWebId);
        assert.equal(semanticChat.getMessages().length, 0, "we do not have messages yet : " + semanticChat.getMessages().length);
        assert.equal(semanticChat.interlocutorWebId, "https://morningstar.solid.community/profile/card#me", "Thefriend web id is not correct : ->" + semanticChat.userWebId);

    });

    it("Creating groupal semantic chat", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");

        const dataUrl = baseService.getDefaultDataUrl(chat.userWebId);
        const interlocutorIds = ["https://morningstar.solid.community/profile/card#me", "https://helbrecht.solid.community/profile/card#me"];

        var group = await createService.setUpNewGroup(dataUrl, chat.userWebId, interlocutorIds, "");

        //Simulating a new chat
        assert.equal(group.userWebId, "https://othbak.solid.community/profile/card#me", "The user web id is not correct : ->" + group.userWebId);
        assert.equal(group.getMessages().length, 0, "we do not have messages yet in this group : " + group.getMessages().length);
        assert.equal(group.members[0], "https://morningstar.solid.community/profile/card#me", "The first friend web id is not correct : ->" + group.members[0]);
        assert.equal(group.members[1], "https://helbrecht.solid.community/profile/card#me", "The second friend web id is not correct : ->" + group.members[1]);
        assert.equal(group.members[2], null, "we only have two friends and the user in this group.");

    });

    it("Joining group, but failing due to wrong data", async function() {
        await joinService.joinExistingChat("Noacceptabledata", "Group/WorldMarshal", "https://helbrechtttt.solid.community/profile/card#me", "anurl", "World Marshal", ["Nonexistant1", "Nonexistant2"]);
    });

    it("Message Service storage tests", async function() {
        const chat = await loader.loadChatFromUrl("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/unittest_201903201125.ttl");
        let message = await messageService.getNewMessage(chat.chatUrl, chat.userWebId);
        //No messages found
        assert.equal(message, null, "there should not be any new messages: ->" + message);

        messageService.storeMessage("https://morningstar.solid.community/private/dechat_201903190808.ttl", "Luci", "https://morningstar.solid.community/profile/card#me", "2119-03-22T22-08-59", "Only love is with us now", "https://decker.solid.community/profile/card#me", true, null);
        //No sending
        messageService.storeMessage("https://morningstar.solid.community/private/dechat_201903190808.ttl", "Luci", "https://morningstar.solid.community/profile/card#me", "2119-03-22T22-09-43", "Something warm and pure", "https://decker.solid.community/profile/card#me", false, null);
        //Group sending
        messageService.storeMessage("https://morningstar.solid.community/private/dechat_201903190808.ttl", "Luci", "https://morningstar.solid.community/profile/card#me", "2119-03-22T22-08-59", "Find the beast within ourselves", "Group/Test", true, ["https://decker.solid.community/profile/card#me", "https://thenothingnessofoursouls.solid.community/profile/card#me"]);
    });


    it("Message Service: get new message from simulated inbox", async function() {
        let message = await messageService.getNewMessage("https://yarrick.solid.community/public/dechat_201903140619.ttl", null);

        assert.equal(message.inboxUrl, "https://yarrick.solid.community/public/dechat_201903140619.ttl", "Url should be : -> https://yarrick.solid.community/public/dechat_201903140619.ttl");
        assert.equal(message.messagetext, "The unenlightened masses", "Message text not properly loaded");
        assert.equal(message.messageUrl, "https://sundowner.solid.community/private/dechat_201903281144.ttl#jtt86m2l", "Wrong message url");
        assert.equal(message.author, "https://yarrick.solid.community/public/Group/Grupo C/Sundowner", "Author of message not properly loading");
        assert.equal(message.time, "2119-03-28T23-46-30", "Time of message not properly loading");
    });


    it("Group chat tests using loader", async function() {
        //group chat
        const groupChat = await loader.loadGroupFromUrl("https://morningstar.solid.community/public/dechat_201903221046.ttl", "https://morningstar.solid.community/profile/card#me", "https://morningstar.solid.community/public/dechat_201903221046.ttl");

        const selfPhoto = await baseService.getPhoto(groupChat.userWebId);
        assert.equal(selfPhoto, null, "The user does not have a photo : " + groupChat.userWebId + " ->" + selfPhoto);

        const name = await baseService.getFormattedName(groupChat.userWebId);
        assert.equal(name, "Luci", "The user name is not correct : ->" + name);

        //the group for the moment has 1 messages
        assert.equal(groupChat.getNumberOfMsgs(), 1, "the number of messages is not correct : " + groupChat.getNumberOfMsgs());
    });

    it("Join service test", async function() {
        const userDataUrl = await baseService.getDefaultDataUrl("https://morningstar.solid.community/profile/card#me");
        //cannot be tested as it changes the time
        assert.notEqual(userDataUrl, "https://morningstar.solid.community/private/dechat_201903231229.ttl", "the user data Url is not correct : " + userDataUrl);

        await joinService.joinExistingChat(userDataUrl, "https://othbak.solid.community/profile/card#me", "https://morningstar.solid.community/profile/card#me", "https://morningstar.solid.community/private/dechat_201903221145.ttl#jtknkfrd", "Othmane Bakhtaoui", undefined);
        //if no error then it's all good
        //the other cases cannot be tested as the file urls are private and cannot be accessed.
    });

    it("Get Invitation test", async function() {
        var invite = await baseService.getInvitation("https://morningstar.solid.community/public/dechat_201903160752.ttl");
        assert.notEqual(invite, null, "the invitation url is not correct: ->" + invite);
        //Encrypted
        var invite = await baseService.getInvitation("https://rokivulovic.solid.community/public/dechat_201903161213.ttl");

        assert.equal(invite.interlocutor, "https://rokivulovic.solid.community/profile/card#me", "the interlocutor is not correct: ->" + invite.interlocutor);
        assert.equal(invite.url, "https://takumi.solid.community/private/dechat_201904050438.ttl#ju46by2l", "the url is not correct: ->" + invite.url);
        assert.equal(invite.agent, "https://takumi.solid.community/profile/card#me", "the agent is not correct: ->" + invite.agent);
        assert.equal(invite.ievent, "https://takumi.solid.community/private/dechat_201904050438.ttl#ju46bxwz", "the ievent is not correct: ->" + invite.ievent);

        //Invite along with message
        var message = await messageService.getNewMessage("https://rokivulovic.solid.community/public/dechat_201903150728.ttl");
        assert.equal(message.messagetext, "Eyyy roki que hay", "the text is not correct: ->" + message.messagetext);
        assert.equal(message.author, "Takumi", "the author is not correct: ->" + message.author);
        assert.equal(message.time, "2119-04-05T16-38-15", "the time is not correct: ->" + message.time);
    });

    it("Process chat to join", async function() {
        var ids = ["https://morningstar.solid.community/profile/card#me"];
        const chat = {
            friendIds: ids
        };
        const semanticChat = await joinService.processChatToJoin(chat, "https://helbrecht.solid.community/private/dechat_201903231229.ttl", "https://helbrecht.solid.community/profile/card#me", null);
        assert.equal(semanticChat.url, "https://helbrecht.solid.community/private/dechat_201903231229.ttl", "the file url is not correct: ->" + semanticChat.url);
        assert.equal(semanticChat.messageBaseUrl, null, "It should be null: ->" + semanticChat.messageBaseUrl);
        assert.equal(semanticChat.userWebId, "https://helbrecht.solid.community/profile/card#me", "the user id is not correct: ->" + semanticChat.userWebId);
        assert.equal(semanticChat.interlocutorWebId, "https://morningstar.solid.community/profile/card#me", "the interlocutor id is not correct: ->" + semanticChat.interlocutorWebId);
        assert.equal(semanticChat.interlocutorName, "Luci", "the formatted name is not correct: ->" + semanticChat.interlocutorName);

        ids = ["Group/SrpskaU+0020Garda", "https://sundowner.solid.community/profile/card#me", "https://morningstar.solid.community/profile/card#me"];
        const group = {
            friendIds: ids
        };
        const semanticGroup = await joinService.processChatToJoin(group, "https://helbrecht.solid.community/private/dechat_201903231230.ttl", "https://helbrecht.solid.community/profile/card#me", null);
        assert.equal(semanticGroup.url, "https://helbrecht.solid.community/private/dechat_201903231230.ttl", "the file url is not correct: ->" + semanticGroup.url);
        assert.equal(semanticGroup.messageBaseUrl, null, "It should be null: ->" + semanticGroup.messageBaseUrl);
        assert.equal(semanticGroup.userWebId, "https://helbrecht.solid.community/profile/card#me", "the user id is not correct: ->" + semanticGroup.userWebId);
        assert.equal(semanticGroup.interlocutorWebId, "Group/Srpska Garda", "the interlocutor id is not correct: ->" + semanticGroup.interlocutorWebId);
        assert.equal(semanticGroup.interlocutorName, "Srpska Garda", "the formatted name is not correct: ->" + semanticGroup.interlocutorName);
        ids.splice(0, 1);
        assert.equal(semanticGroup.members, ids, "the members are not correct: ->" + semanticGroup.members);


    });

    it("Join Services Test: processChatToJoin and getJoinRequest", async function() {
        const invite = baseService.getInvitation("https://othbak.solid.community/public/unittest_201903201125.ttl#jth2a2sl");
        assert.notEqual(invite, null, "the invitation url is not correct: ->" + invite);

        var join = joinService.getJoinRequest("https://othbak.solid.community/public/dechat_201903110835.ttl", "https://othbak.solid.community/profile/card#me");
        assert.notEqual(join, null, "the user does have a join request: ->" + join);

        var processChatToJoin = joinService.processChatToJoin("https://othbak.solid.community/public/dechat_201903110835.ttl", "https://othbak.solid.community/public/dechat_201903110835.ttl", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/profile/card#me", "https://othbak.solid.community/public/dechat_201903110835.ttl");
        assert.notEqual(processChatToJoin, null, "the user does have a join request: ->" + processChatToJoin);

    });

});
