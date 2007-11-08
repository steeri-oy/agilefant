package fi.hut.soberit.agilefant.web;

import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork.Action;
import com.opensymphony.xwork.ActionSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import fi.hut.soberit.agilefant.business.BacklogBusiness;
import fi.hut.soberit.agilefant.business.UserBusiness;
import fi.hut.soberit.agilefant.db.BacklogDAO;
import fi.hut.soberit.agilefant.db.BacklogItemDAO;
import fi.hut.soberit.agilefant.db.EffortHistoryDAO;
import fi.hut.soberit.agilefant.db.TaskEventDAO;
import fi.hut.soberit.agilefant.model.Backlog;
import fi.hut.soberit.agilefant.model.BacklogItem;
import fi.hut.soberit.agilefant.model.Deliverable;
import fi.hut.soberit.agilefant.model.Iteration;
import fi.hut.soberit.agilefant.model.Product;
import fi.hut.soberit.agilefant.model.User;
import fi.hut.soberit.agilefant.security.SecurityUtil;
import fi.hut.soberit.agilefant.util.EffortHistoryUpdater;

public class DailyWorkAction extends ActionSupport {
	private static final long serialVersionUID = 5732278003634700787L;
	
	private User user;
	private UserBusiness userBusiness;
	
	private List<BacklogItem> backlogItemsForUserInProgress;
	
	@Override
	public String execute() throws Exception {
		backlogItemsForUserInProgress =
			userBusiness.getBacklogItemsInProgress(user);
		
		return super.execute();
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public UserBusiness getUserBusiness() {
		return userBusiness;
	}
	public void setUserBusiness(UserBusiness userBusiness) {
		this.userBusiness = userBusiness;
	}

	public List<BacklogItem> getBacklogItemsForUserInProgress() {
		return backlogItemsForUserInProgress;
	}

	public void setBacklogItemsForUserInProgress(
			List<BacklogItem> backlogItemsForUserInProgress) {
		this.backlogItemsForUserInProgress = backlogItemsForUserInProgress;
	}
}
