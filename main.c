#include <stdio.h>
#include "migemo.h"

int migemoRun() {
  migemo *m;
  /* C/Migemoの準備: 辞書読込にはエラー検出のためloadを推奨 */
  m = migemo_open(NULL);
  migemo_load(m, MIGEMO_DICTID_MIGEMO, "./dict/migemo-dict");
  /* 必要な回数だけqueryを行なう */
  {
    unsigned char* p;
    p = migemo_query(m, "nezu");
    printf("C/Migemo: %s\n", p);
    migemo_release(m, p); /* queryの結果は必ずreleaseする */
  }
  /* 利用し終わったmigemoオブジェクトはcloseする */
  migemo_close(m);
  return 0;
}
