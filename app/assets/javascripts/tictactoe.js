/**
 * Copyright (C) 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Tic Tac Toe Gameplay with Chromecast
 * This file exposes cast.TicTacToe as an object containing a
 * CastMessageBus and capable of receiving and sending messages
 * to the sender application.
 */

// External namespace for cast specific javascript library
var cast = window.cast || {};

// Anonymous namespace
(function() {
  'use strict';

  Presentation.PROTOCOL = 'urn:x-cast:com.fandor.demo.tictactoe';

  function Presentation() {
    this.castReceiverManager_ = cast.receiver.CastReceiverManager.getInstance();
    this.castMessageBus_ =
        this.castReceiverManager_.getCastMessageBus(Presentation.PROTOCOL,
        cast.receiver.CastMessageBus.MessageType.JSON);
    this.castMessageBus_.onMessage = this.onMessage.bind(this);
    this.castReceiverManager_.onSenderConnected =
        this.onSenderConnected.bind(this);
    this.castReceiverManager_.onSenderDisconnected =
        this.onSenderDisconnected.bind(this);
    this.castReceiverManager_.start();
  }

  Presentation.prototype = {

    /**
     * Sender Connected event
     * @param {event} event the sender connected event.
     */
    onSenderConnected: function(event) {
      console.log('onSenderConnected. Total number of senders: ' +
          this.castReceiverManager_.getSenders().length);
    },

    /**
     * Sender disconnected event; if all senders are disconnected,
     * closes the application.
     * @param {event} event the sender disconnected event.
     */
    onSenderDisconnected: function(event) {
      console.log('onSenderDisconnected. Total number of senders: ' +
          this.castReceiverManager_.getSenders().length);

      if (this.castReceiverManager_.getSenders().length == 0) {
        window.close();
      }
    },

    /**
     * Message received event; determines event message and command, and
     * choose function to call based on them.
     * @param {event} event the event to be processed.
     */
    onMessage: function(event) {
      var message = event.data;
      var senderId = event.senderId;
      console.log('********onMessage********' + JSON.stringify(event.data));

      if (message.command == 'load') {
        this.onLoad();
      } else if (message.command == 'prev') {
        this.onPrev();
      } else if (message.command == 'next') {
        this.onNext();
      } else {
        console.log('Invalid message command: ' + message.command);
      }
    },

    onLoad: function() {
      $('#debug').append("<div>onLoad</div>");
    },

    onPrev: function() {
      $('#debug').append("<div>onPrev</div>");
    },

    onNext: function() {
      $('#debug').append("<div>onNext</div>");
    },

    sendError: function(senderId, errorMessage) {
      this.castMessageBus_.send(senderId, {
        'event': 'error',
        'message': errorMessage });
    },

    /**
     * Broadcasts a message to all of this object's known channels.
     * @param {Object|string} message the message to broadcast.
     */
    broadcast: function(message) {
      this.castMessageBus_.broadcast(message);
    }

  };

  // Exposes public functions and APIs
  cast.Presentation = Presentation;
})();
