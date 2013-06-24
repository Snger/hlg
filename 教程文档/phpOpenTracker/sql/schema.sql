#
# phpOpenTracker
#
# Copyright (c) 2000-2009, Sebastian Bergmann <sb@sebastian-bergmann.de> and
# Copyright (c) 2009,      Arne Blankerts <arne@blankerts.de>.
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions
# are met:
#
#  * Redistributions of source code must retain the above copyright
#    notice, this list of conditions and the following disclaimer.
#
#  * Redistributions in binary form must reproduce the above copyright
#    notice, this list of conditions and the following disclaimer in
#    the documentation and/or other materials provided with the
#    distribution.
#
#  * Neither the name of Sebastian Bergmann nor the names of his
#    contributors may be used to endorse or promote products derived
#    from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
# "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
# LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
# FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
# COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
# INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
# BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRIC
# LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
# ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.
#

DROP TABLE IF EXISTS visits;
CREATE TABLE visits (
  # The ID of a visit (unique per session)
  `visit_id`                    INTEGER   UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,

  # The ID of a visitor (unique per visitor)
  `visitor_id`                  INTEGER   UNSIGNED NOT NULL,

  `timestamp`                   TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `user_agent_raw`              CHAR(128)          NOT NULL,
  `user_agent_os`               CHAR(128)          NOT NULL,
  `user_agent_os_version`       CHAR(128)          NOT NULL,
  `user_agent_os_vendor`        CHAR(128)          NOT NULL,
  `user_agent_engine`           CHAR(128)          NOT NULL,
  `user_agent_engine_version`   CHAR(128)          NOT NULL,
  `user_agent_vendor`           CHAR(128)          NOT NULL,
  `user_agent_vendor_version`   CHAR(128)          NOT NULL,
  `user_agent_language`         CHAR(128)          NOT NULL,

  `fullscreen`                  BOOLEAN            NOT NULL,
  `javascript`                  BOOLEAN            NOT NULL,
  `plugin_flash`                CHAR(16),
  `plugin_java`                 CHAR(16),
  `plugin_pdf`                  CHAR(16),
  `plugin_quicktime`            CHAR(16),
  `plugin_silverlight`          CHAR(16),
  `plugin_wmp`                  CHAR(16),

  `resolution_width`            SMALLINT  UNSIGNED NOT NULL,
  `resolution_height`           SMALLINT  UNSIGNED NOT NULL,
  `resolution_avail_width`      SMALLINT  UNSIGNED NOT NULL,
  `resolution_avail_height`     SMALLINT  UNSIGNED NOT NULL,
  `resolution_inner_width`      SMALLINT  UNSIGNED NOT NULL,
  `resolution_inner_height`     SMALLINT  UNSIGNED NOT NULL,
  `resolution_depth`            TINYINT   UNSIGNED NOT NULL,

  `accept_language`             CHAR(128)          NOT NULL,
  `accept_charset`              CHAR(128)          NOT NULL,
  `accept_encoding`             CHAR(128)          NOT NULL,
  `accept_mimetype`             CHAR(128)          NOT NULL,

  `via`                         CHAR(128)          NOT NULL,
  `x_http_forwarded_for`        CHAR(128)          NOT NULL
) ENGINE=MyISAM;

DROP TABLE IF EXISTS page_impressions;
CREATE TABLE page_impressions (
  `page_impression`             BIGINT    UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `visit_id`                    INTEGER   UNSIGNED NOT NULL REFERENCES visits.visit_id,

  `timestamp`                   TIMESTAMP          NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `url`                         CHAR(255)          NOT NULL,
  `payload`                     TEXT,
  `referer`                     CHAR(255)          NOT NULL,
  `followup`                    CHAR(255)          NOT NULL,

  `request_method`              ENUM(
                                  'GET',
                                  'POST',
                                  'HEAD',
                                  'PUT',
                                  'DELETE',
                                  'TRACE',
                                  'OPTIONS',
                                  'CONNECT',
                                  'PROPFIND',
                                  'PROPPATCH',
                                  'MKCOL',
                                  'COPY',
                                  'MOVE',
                                  'LOCK',
                                  'UNLOCK'
                                )                  NOT NULL,

  `remote_ip`                   INTEGER   UNSIGNED NOT NULL,
  `authorized`                  BOOLEAN            NOT NULL
) ENGINE=MyISAM;

DROP TABLE IF EXISTS clicks;
CREATE TABLE clicks (
  # The page impression this click occured on
  `page_impression`      BIGINT    UNSIGNED NOT NULL REFERENCES page_impressions.page_impression,

  `link_position_count`  SMALLINT  UNSIGNED NOT NULL,

  `element_tag`          CHAR(8)            NOT NULL,
  `element_id`           CHAR(128)          NOT NULL,
  `element_href`         CHAR(128)          NOT NULL,
  `element_rel`          CHAR(128)          NOT NULL,
  `element_title`        CHAR(128)          NOT NULL,

  `event_client_x`       SMALLINT  UNSIGNED NOT NULL,
  `event_client_y`       SMALLINT  UNSIGNED NOT NULL,
  `event_page_x`         SMALLINT  UNSIGNED NOT NULL,
  `event_page_y`         SMALLINT  UNSIGNED NOT NULL,
  `event_screen_x`       SMALLINT  UNSIGNED NOT NULL,
  `event_screen_y`       SMALLINT  UNSIGNED NOT NULL
) ENGINE=MyISAM;
