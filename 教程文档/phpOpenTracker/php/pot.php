<?php
/*
 * phpOpenTracker
 *
 * Copyright (c) 2000-2009, Sebastian Bergmann <sb@sebastian-bergmann.de> and
 * Copyright (c) 2009, Arne Blankerts <arne@blankerts.de>. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * Neither the name of Sebastian Bergmann nor the names of his contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRIC LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

if ($_GET['a'] == 'c') {
    $mysqli = new MySQLi(POT_DB_HOST, POT_DB_USER, POT_DB_PASS, POT_DB);

    $stmt = $mysqli->prepare(
      'INSERT INTO clicks
                   (page_impression, link_position_count,
                    element_tag, element_id, element_href, element_rel,
                    element_title, event_client_x, event_client_y, event_page_x,
                    event_page_y, event_screen_x, event_screen_y)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    $stmt->bind_param('i', $_SESSION['page_impression']);
    $stmt->bind_param('i', $_GET['c']);
    $stmt->bind_param('s', $_GET['t']);
    $stmt->bind_param('s', $_GET['i']);
    $stmt->bind_param('s', $_GET['h']);
    $stmt->bind_param('s', $_GET['r']);
    $stmt->bind_param('s', $_GET['ti']);
    $stmt->bind_param('i', $_GET['cx']);
    $stmt->bind_param('i', $_GET['cy']);
    $stmt->bind_param('i', $_GET['px']);
    $stmt->bind_param('i', $_GET['py']);
    $stmt->bind_param('i', $_GET['sx']);
    $stmt->bind_param('i', $_GET['sy']);

    $stmt->execute();
}
