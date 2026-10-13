"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Check, ExternalLink, AlertTriangle, Info, Clock } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAdminStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground hover:bg-surface-muted transition-colors focus:outline-none"
        aria-label="View notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-surface shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between border-b border-border p-3 px-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary-soft text-primary px-2 py-0.5 text-xs font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                <Check className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-text-muted">No notifications</div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 transition-colors hover:bg-surface-muted ${
                    !notif.read ? "bg-primary-soft/30" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          notif.type === "warning" || notif.type === "alert"
                            ? "bg-warning-soft text-warning"
                            : notif.type === "urgent"
                            ? "bg-danger-soft text-danger"
                            : "bg-info-soft text-info"
                        }`}
                      >
                        {notif.type === "warning" || notif.type === "alert" ? (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        ) : notif.type === "urgent" ? (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        ) : (
                          <Info className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{notif.title}</div>
                        <p className="mt-0.5 text-xs text-text-muted leading-relaxed">
                          {notif.message}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[11px] text-text-faint">
                            <Clock className="h-3 w-3" /> {notif.timestamp}
                          </span>
                          {notif.link && (
                            <Link
                              href={notif.link}
                              onClick={() => {
                                markNotificationRead(notif.id);
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                            >
                              <span>View details</span>
                              <ExternalLink className="h-2.5 w-2.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    {!notif.read && (
                      <button
                        onClick={() => markNotificationRead(notif.id)}
                        title="Mark as read"
                        className="p-1 text-text-faint hover:text-foreground shrink-0"
                      >
                        <span className="block h-2 w-2 rounded-full bg-primary" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
